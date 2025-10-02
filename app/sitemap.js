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
const MAX_DETAIL_URLS = 500;
const MAX_PAGES = 3;

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

// Fungsi untuk mendapatkan data dengan pagination
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

// Konfigurasi caching untuk sitemap
export const revalidate = 86400; // 24 jam

export default async function sitemap() {
  const movieCategories = ['popular', 'now_playing', 'upcoming', 'top_rated'];
  const tvCategories = ['popular', 'airing_today', 'on_the_air', 'top_rated'];

  try {
    console.log('🔄 Memulai generate sitemap...');

    // Ambil genres dengan error handling
    const [movieGenres, tvGenres] = await Promise.allSettled([
      getMovieGenres(),
      getTvSeriesGenres()
    ]).then(results => 
      results.map(result => result.status === 'fulfilled' ? result.value : [])
    );

    console.log(`🎬 Genre film: ${movieGenres.length}, Genre TV: ${tvGenres.length}`);

    // Ambil data dari semua kategori dengan pagination
    const allPromises = await Promise.allSettled([
      // Movie categories dengan pagination
      Promise.all(movieCategories.map(category => 
        getPaginatedData(getMoviesByCategory, category, 2)
      )),
      
      // Movie genres dengan pagination (masih pakai ID untuk fetch data)
      Promise.all(movieGenres.map(genre => 
        getPaginatedData(getMoviesByGenre, genre.id, 1)
      )),
      
      // TV categories dengan pagination
      Promise.all(tvCategories.map(category => 
        getPaginatedData(getTvSeriesByCategory, category, 2)
      )),
      
      // TV genres dengan pagination (masih pakai ID untuk fetch data)
      Promise.all(tvGenres.map(genre => 
        getPaginatedData(getTvSeriesByGenre, genre.id, 1)
      ))
    ]);

    // Extract results dengan safety check
    const extractData = (result) => 
      result.status === 'fulfilled' ? result.value.flat().filter(Boolean) : [];

    const [movieCats, movieGens, tvCats, tvGens] = allPromises.map(extractData);

    // Gabungkan dan hapus duplikat
    const allMovies = [...movieCats, ...movieGens];
    const allTvShows = [...tvCats, ...tvGens];

    const uniqueMovies = Array.from(new Map(
      allMovies.filter(m => m?.id && m?.title).map(m => [m.id, m])
    ).values());

    const uniqueTvShows = Array.from(new Map(
      allTvShows.filter(tv => tv?.id && tv?.name).map(tv => [tv.id, tv])
    ).values());

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

    // URL Genre Film (SEKARANG DENGAN NAMA GENRE)
    const movieGenreUrls = movieGenres.map(genre => {
      const genreSlug = createGenreSlug(genre.name);
      return {
        url: `${BASE_URL}/movie/genre/${genreSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: calculatePriority(`${BASE_URL}/movie/genre/${genreSlug}`)
      };
    });

    // URL Genre TV (SEKARANG DENGAN NAMA GENRE)
    const tvGenreUrls = tvGenres.map(genre => {
      const genreSlug = createGenreSlug(genre.name);
      return {
        url: `${BASE_URL}/tv-show/genre/${genreSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: calculatePriority(`${BASE_URL}/tv-show/genre/${genreSlug}`)
      };
    });

    // Batasi jumlah URL detail
    const limitedMovies = uniqueMovies.slice(0, MAX_DETAIL_URLS);
    const limitedTvShows = uniqueTvShows.slice(0, MAX_DETAIL_URLS);

    // URL Detail Film
    const movieDetailUrls = limitedMovies.map(movie => {
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

    // URL Detail TV Show
    const tvDetailUrls = limitedTvShows.map(tvShow => {
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
    
    // Fallback minimal sitemap
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
      }
    ];
  }
}