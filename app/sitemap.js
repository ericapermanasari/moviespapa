// app/sitemap.js
import {
  getMovieGenres,
  getMoviesByCategory,
  getTvSeriesByCategory,
  getTvSeriesGenres,
  getMoviesByGenre,
  getTvSeriesByGenre
} from '../lib/api';

const BASE_URL = 'https://moviespapa-hd.netlify.app';

// Konfigurasi
const MAX_DETAIL_URLS = 100; // Kurangi untuk build pertama
const MAX_PAGES = 2; // Kurangi jumlah halaman

// Fungsi utilitas untuk membuat slug
const createSlug = (name, year) => {
  if (!name) return '';
  
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // Validasi tahun lebih ketat
  if (!year || typeof year !== 'string' || year.length !== 4 || isNaN(year)) {
    return baseSlug;
  }
  
  return `${baseSlug}-${year}`;
};

// Fungsi untuk membuat slug dari nama genre
const createGenreSlug = (genreName) => {
  if (!genreName) return 'genre';
  
  return genreName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Fungsi untuk menghitung priority berdasarkan URL
const calculatePriority = (url) => {
  if (url.includes('/stream')) return 0.4;
  if (url.includes('/movie/') || url.includes('/tv-show/')) {
    if (url.split('/').length === 4) return 0.7;
    return 0.8;
  }
  return 0.9;
};

// Fungsi untuk mendapatkan data dengan pagination dan CACHE
const getPaginatedData = async (fetchFunction, identifier, pageCount = MAX_PAGES) => {
  const promises = [];
  for (let page = 1; page <= pageCount; page++) {
    promises.push(
      fetchFunction(identifier, page).catch(error => {
        console.warn(`Error fetching page ${page} for ${identifier}:`, error.message);
        return [];
      })
    );
  }
  
  const results = await Promise.allSettled(promises);
  return results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value)
    .flat()
    .filter(Boolean);
};

// KONFIGURASI CACHE UNTUK SITEMAP - PERBAIKAN UTAMA
export const revalidate = 86400; // 24 jam

export default async function sitemap() {
  const movieCategories = ['popular', 'now_playing', 'upcoming', 'top_rated'];
  const tvCategories = ['popular', 'airing_today', 'on_the_air', 'top_rated'];

  try {
    console.log('🔄 Memulai generate sitemap...');

    // Ambil genres dengan error handling dan CACHE
    const [movieGenres, tvGenres] = await Promise.allSettled([
      getMovieGenres(),
      getTvSeriesGenres()
    ]).then(results => 
      results.map(result => result.status === 'fulfilled' ? result.value : [])
    );

    console.log(`🎬 Genre film: ${movieGenres.length}, Genre TV: ${tvGenres.length}`);

    // Jika tidak ada genres, return sitemap minimal
    if (movieGenres.length === 0 && tvGenres.length === 0) {
      console.log('⚠️ Tidak ada data genre, menggunakan sitemap fallback');
      return getFallbackSitemap();
    }

    // Ambil data dari semua kategori dengan pagination terbatas
    const allPromises = await Promise.allSettled([
      // Movie categories dengan pagination minimal
      Promise.all(movieCategories.map(category => 
        getPaginatedData(getMoviesByCategory, category, 1) // Hanya 1 halaman
      )),
      
      // TV categories dengan pagination minimal  
      Promise.all(tvCategories.map(category => 
        getPaginatedData(getTvSeriesByCategory, category, 1) // Hanya 1 halaman
      ))
    ]);

    // Extract results dengan safety check
    const extractData = (result) => 
      result.status === 'fulfilled' ? result.value.flat().filter(Boolean) : [];

    const [movieCats, tvCats] = allPromises.map(extractData);

    // Gabungkan data (skip genre data untuk mengurangi API calls)
    const allMovies = [...movieCats];
    const allTvShows = [...tvCats];

    const uniqueMovies = Array.from(new Map(
      allMovies.filter(m => m?.id && m?.title).map(m => [m.id, m])
    ).values()).slice(0, MAX_DETAIL_URLS); // Batasi langsung

    const uniqueTvShows = Array.from(new Map(
      allTvShows.filter(tv => tv?.id && tv?.name).map(tv => [tv.id, tv])
    ).values()).slice(0, MAX_DETAIL_URLS); // Batasi langsung

    console.log(`📊 Film unik: ${uniqueMovies.length}, TV unik: ${uniqueTvShows.length}`);

    // URL Statis
    const staticUrls = [
      {
        url: `${BASE_URL}/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0
      },
      {
        url: `${BASE_URL}/movie`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9
      },
      {
        url: `${BASE_URL}/tv-show`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9
      },
      {
        url: `${BASE_URL}/trending`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.9
      },
      {
        url: `${BASE_URL}/search`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: `${BASE_URL}/adult/adult-movies`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3
      },
      {
        url: `${BASE_URL}/adult/erotic-movies`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.1
      },
      {
        url: `${BASE_URL}/dmca`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.1
      },
      {
        url: `${BASE_URL}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.1
      },
      {
        url: `${BASE_URL}/terms-of-service`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.1
      }
    ];

    // URL Kategori Film
    const movieCategoryUrls = movieCategories.map(category => ({
      url: `${BASE_URL}/movie/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: calculatePriority(`${BASE_URL}/movie/${category}`)
    }));

    // URL Kategori TV
    const tvCategoryUrls = tvCategories.map(category => ({
      url: `${BASE_URL}/tv-show/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: calculatePriority(`${BASE_URL}/tv-show/${category}`)
    }));

    // URL Genre Film (HANYA URL, TANPA FETCH DATA)
    const movieGenreUrls = movieGenres.slice(0, 5).map(genre => { // Batasi genre
      const genreSlug = createGenreSlug(genre.name);
      return {
        url: `${BASE_URL}/movie/genre/${genreSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: calculatePriority(`${BASE_URL}/movie/genre/${genreSlug}`)
      };
    });

    // URL Genre TV (HANYA URL, TANPA FETCH DATA)  
    const tvGenreUrls = tvGenres.slice(0, 5).map(genre => { // Batasi genre
      const genreSlug = createGenreSlug(genre.name);
      return {
        url: `${BASE_URL}/tv-show/genre/${genreSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: calculatePriority(`${BASE_URL}/tv-show/genre/${genreSlug}`)
      };
    });

    // URL Detail Film (TERBATAS)
    const movieDetailUrls = uniqueMovies.map(movie => {
      const year = movie.release_date?.substring(0, 4);
      const slug = createSlug(movie.title, year);
      
      return [
        {
          url: `${BASE_URL}/movie/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: calculatePriority(`${BASE_URL}/movie/${slug}`)
        },
        {
          url: `${BASE_URL}/movie/${slug}/stream`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: calculatePriority(`${BASE_URL}/movie/${slug}/stream`)
        }
      ];
    }).flat();

    // URL Detail TV Show (TERBATAS)
    const tvDetailUrls = uniqueTvShows.map(tvShow => {
      const year = tvShow.first_air_date?.substring(0, 4);
      const slug = createSlug(tvShow.name, year);
      
      return [
        {
          url: `${BASE_URL}/tv-show/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: calculatePriority(`${BASE_URL}/tv-show/${slug}`)
        },
        {
          url: `${BASE_URL}/tv-show/${slug}/stream`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: calculatePriority(`${BASE_URL}/tv-show/${slug}/stream`)
        }
      ];
    }).flat();

    // Gabungkan semua URL
    const allUrls = [
      ...staticUrls,
      ...movieCategoryUrls,
      ...tvCategoryUrls,
      ...movieGenreUrls,
      ...tvGenreUrls,
      ...movieDetailUrls,
      ...tvDetailUrls,
    ];

    console.log(`✅ Sitemap berhasil dibuat dengan ${allUrls.length} URL`);
    console.log(`🎭 Contoh URL genre: ${movieGenreUrls[0]?.url}`);

    return allUrls;

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return getFallbackSitemap();
  }
}

// Fallback sitemap minimal
function getFallbackSitemap() {
  const BASE_URL = 'https://moviespapa.netlify.app';
  
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${BASE_URL}/movie`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/tv-show`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/trending`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];
}