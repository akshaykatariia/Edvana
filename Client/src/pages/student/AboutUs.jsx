import React from "react";
import { assets } from "../../assets/assets";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Image or Illustration */}
        <div className="hidden md:block">
          <img
            src={assets.Elearning}
            alt="About Edvana"
            className="rounded-xl shadow-xl w-full"
          />
        </div>

        {/* Right side - Content */}
        <div>
          <h1 className="text-4xl font-bold text-blue-700 mb-4">About Edvana</h1>
          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            At <span className="font-semibold text-blue-600">Edvana</span>, we
            believe learning should be accessible, engaging, and effective.
            Started with a vision to make quality education reachable for all,
            we provide top-notch online courses that are tailored to your career
            growth.
          </p>

          <p className="text-gray-700 mb-4">
            Whether you're a student, a job seeker, or a lifelong learner,Edvana
            is your one-stop destination to upgrade skills, gain certifications,
            and stay ahead.
          </p>

          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>
              🎯 Mission: Empower learners through accessible digital education.
            </li>
            <li>🌍 Vision: To be India’s most loved learning platform.</li>
            <li>💡 Core Values: Simplicity, Innovation, Growth, Impact.</li>
          </ul>
        </div>
      </div>

      {/* Team or Company Highlights Section */}
      <div className="mt-16 w-full text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          Why Choose Edvana?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-blue-50 hover:bg-blue-100 transition-all p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Expert Educators
            </h3>
            <p className="text-gray-600">
              Learn from industry experts and certified trainers.
            </p>
          </div>
          <div className="bg-blue-50 hover:bg-blue-100 transition-all p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Flexible Learning
            </h3>
            <p className="text-gray-600">
              Study anytime, anywhere with our self-paced courses.
            </p>
          </div>
          <div className="bg-blue-50 hover:bg-blue-100 transition-all p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Career-Oriented
            </h3>
            <p className="text-gray-600">
              Courses designed to boost your job and freelance skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
