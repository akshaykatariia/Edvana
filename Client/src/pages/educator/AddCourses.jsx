// src/pages/educator/AddCourses.jsx
import React, { useState } from "react";

const AddCourses = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [chapters, setChapters] = useState([
    { name: "Introduction", lectures: [] },
  ]);

  const handleAddChapter = () => {
    const name = prompt("Enter chapter name:");
    if (name) {
      setChapters([...chapters, { name, lectures: [] }]);
    }
  };

  const handleAddLecture = (chapterIndex) => {
    const title = prompt("Lecture Title:");
    const duration = prompt("Duration (minutes):");
    const url = prompt("Lecture URL:");
    const isFree = window.confirm("Is Preview Free?");

    if (title && duration && url) {
      const newChapters = [...chapters];
      newChapters[chapterIndex].lectures.push({ title, duration, url, isFree });
      setChapters(newChapters);
    }
  };

  const handleRemoveLecture = (chapterIndex, lectureIndex) => {
    const newChapters = [...chapters];
    newChapters[chapterIndex].lectures.splice(lectureIndex, 1);
    setChapters(newChapters);
  };

  const handleRemoveChapter = (index) => {
    const newChapters = chapters.filter((_, i) => i !== index);
    setChapters(newChapters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const course = {
      title,
      description,
      price,
      discount,
      thumbnail,
      chapters,
    };

    const existingCourses = JSON.parse(localStorage.getItem("courses") || "[]");
    const updatedCourses = [...existingCourses, course];
    localStorage.setItem("courses", JSON.stringify(updatedCourses));

    setTitle("");
    setDescription("");
    setPrice(0);
    setDiscount(0);
    setChapters([{ name: "Introduction", lectures: [] }]);
    setThumbnail(null);
    alert("Course added!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Course Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Course Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="flex gap-4">
          <div>
            <label className="block mb-1">Course Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Discount %</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Course Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setThumbnail(URL.createObjectURL(e.target.files[0]))
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          {chapters.map((chapter, cIndex) => (
            <div key={cIndex} className="border p-2 rounded">
              <div className="flex justify-between items-center">
                <strong>
                  {chapter.name} - {chapter.lectures.length} Lectures
                </strong>
                <button
                  type="button"
                  onClick={() => handleRemoveChapter(cIndex)}
                  className="text-red-500"
                >
                  ✖
                </button>
              </div>
              <ul className="pl-4 mt-2">
                {chapter.lectures.map((lec, lIndex) => (
                  <li
                    key={lIndex}
                    className="flex justify-between items-center"
                  >
                    {lIndex + 1}. {lec.title} - {lec.duration} mins -
                    <a
                      href={lec.url}
                      className="text-blue-500"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link
                    </a>
                    - {lec.isFree ? "Free Preview" : "Paid"}
                    <button
                      type="button"
                      onClick={() => handleRemoveLecture(cIndex, lIndex)}
                      className="text-red-500 ml-2"
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleAddLecture(cIndex)}
                className="text-blue-600 mt-2"
              >
                + Add Lecture
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddChapter}
            className="bg-gray-300 px-4 py-1 rounded"
          >
            + Add Chapter
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourses;
