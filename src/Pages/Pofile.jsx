import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [myUploads, setMyUploads] = useState([]);
  const [savedDocs, setSavedDocs] = useState([]);

  useEffect(() => {
    // Safely get user from localStorage
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email) {
        setUser(storedUser);
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
    }

    // Dummy data (replace with API calls in real app)
    setMyUploads([
      { id: 1, title: "Worship Sheet", category: "PECA", date: "2025-05-14" },
      { id: 2, title: "Youth Notes", category: "CYF", date: "2025-05-12" },
    ]);

    setSavedDocs([
      { id: 3, title: "Budget Report", category: "RECA", date: "2025-05-10" },
    ]);
  }, []);

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading profile... (Make sure you're logged in)
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#800000] mb-2">My Profile</h1>

      <div className="bg-white shadow-md p-4 rounded-xl mb-6 border border-gray-100">
        <p className="text-lg font-medium text-gray-800">👤 {user.name}</p>
        <p className="text-sm text-gray-500">📧 {user.email}</p>
      </div>

      {/* My Uploads */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#800000] mb-3">📤 My Uploadss</h2>
        {myUploads.length === 0 ? (
          <p className="text-sm text-gray-500">You haven’t uploaded any documents yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myUploads.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <h3 className="font-semibold text-[#800000]">{doc.title}</h3>
                <p className="text-sm text-gray-600">Category: {doc.category}</p>
                <p className="text-xs text-gray-400">{doc.date}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Saved Documents */}
      <section>
        <h2 className="text-xl font-semibold text-[#800000] mb-3">📌 Saved Documents</h2>
        {savedDocs.length === 0 ? (
          <p className="text-sm text-gray-500">You haven’t saved any documents yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {savedDocs.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <h3 className="font-semibold text-[#800000]">{doc.title}</h3>
                <p className="text-sm text-gray-600">Category: {doc.category}</p>
                <p className="text-xs text-gray-400">{doc.date}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
