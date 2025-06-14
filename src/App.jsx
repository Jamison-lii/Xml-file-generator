import { useState } from 'react';
import { Card, CardContent } from './Components/Ui/card';
import { Badge } from './Components/Ui/Badge';
import { Button } from './Components/Ui/Button';
import jsPDF from 'jspdf';

export default function MusicPlaylistApp() {
  const [songs, setSongs] = useState([]);
  const [form, setForm] = useState({ title: '', artist: '', genre: '', duration: '' });

  const handleAddSong = () => {
    if (!form.title || !form.artist || !form.genre || !form.duration) return;
    setSongs([...songs, form]);
    setForm({ title: '', artist: '', genre: '', duration: '' });
  };

  const downloadXML = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<playlist>\n${songs
      .map(
        song => `  <song>\n    <title>${song.title}</title>\n    <artist>${song.artist}</artist>\n    <genre>${song.genre}</genre>\n    <duration>${song.duration}</duration>\n  </song>`
      )
      .join('\n')}\n</playlist>`;
    const blob = new Blob([xml], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'playlist.xml';
    link.click();
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(songs, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'playlist.json';
    link.click();
  };

  const downloadCSV = () => {
    const headers = 'Title,Artist,Genre,Duration';
    const rows = songs.map(s => `${s.title},${s.artist},${s.genre},${s.duration}`).join('\n');
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'playlist.csv';
    link.click();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('My Music Playlist', 20, 20);
    let y = 30;
    songs.forEach((s, i) => {
      doc.setFontSize(12);
      doc.text(`${i + 1}. ${s.title} - ${s.artist} [${s.genre}] (${s.duration})`, 20, y);
      y += 10;
    });
    doc.save('playlist.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6 text-white">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">🎧 My Music Playlist</h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl mb-10 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            className="p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Artist"
            value={form.artist}
            onChange={e => setForm({ ...form, artist: e.target.value })}
          />
          <input
            className="p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Genre"
            value={form.genre}
            onChange={e => setForm({ ...form, genre: e.target.value })}
          />
          <input
            className="p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Duration"
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />
        </div>
        <div className="text-center mt-4">
          <Button onClick={handleAddSong}>Add Song</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {songs.map((song, index) => (
          <Card key={index}>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{song.title}</h2>
                <Badge>{song.genre}</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-1">
                Artist: <span className="font-medium text-white">{song.artist}</span>
              </p>
              <p className="text-sm text-gray-400">
                Duration: <span className="text-white">{song.duration}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center flex flex-wrap justify-center gap-4 px-4">
        <Button onClick={downloadXML}>Download XML</Button>
        <Button onClick={downloadJSON}>Download JSON</Button>
        <Button onClick={downloadCSV}>Download CSV</Button>
        <Button onClick={downloadPDF}>Download PDF</Button>
      </div>
    </div>
  );
}
