export interface Track {
  id: string
  title: string
  artist: string
  movie?: string
  youtubeId: string
  duration: number // in seconds
  offset?: number // in seconds
}

export const playlist: Track[] = [
  {
    id: '1',
    title: 'Musafir Hoon Yaaron',
    artist: 'Kishore Kumar',
    movie: 'Parichay',
    youtubeId: '1DwROkoAAcI',
    duration: 472
  },
  {
    id: '2',
    title: 'Synthwave Radio',
    artist: 'Lofi Girl',
    movie: 'Live Stream',
    youtubeId: 'g8C7Lg0mDks', // Known embed-friendly stream
    duration: 3600,
    offset: 6
  },
  {
    id: '3',
    title: 'Zindagi Ke Safar Mein',
    artist: 'Kishore Kumar',
    movie: 'Aap Ki Kasam',
    youtubeId: 'Se7JIGF1RMg',
    duration: 409,
  },
  {
    id: '4',
    title: 'Kahiin Door Jab Din Dhal Jaye',
    artist: 'Mukesh',
    movie: 'Anand',
    youtubeId: 'iJlbuFnKssM',
    duration: 347,
  },
  {
    id: '5',
    title: 'Pal Pal Dil Ke Paas',
    artist: 'Kishore Kumar',
    movie: 'Blackmail',
    youtubeId: 'Vabo2KVaEwA',
    duration: 322,
  },
  {
    id: '6',
    title: 'Kya Hua Tera Wada',
    artist: 'Mohammed Rafi & Sushma Shrestha',
    movie: 'Hum Kisise Kum Naheen',
    youtubeId: 'cIVkYSm7Orw',
    duration: 260,
  }
]
