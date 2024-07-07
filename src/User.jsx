import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import Footer from "./components/Footer/Footer";
import MainStdPage from "./pages/MainStd";
import MainTchrPage from "./pages/MainTchr";
import LessonTchrPage from "./pages/LessonTchr";
import LessonStdPage from "./pages/LessonStd";
import LessonDetailTchrPage from "./pages/LessonDetailTchr";
import WordTchrPage from "./pages/WordTchr";
import WordStdPage from "./pages/WordStd";
import WordCreateTchrPage from "./pages/WordCreateTchr";
import WordLearnStdPage from "./pages/WordLearnStd";
import CreateLessonPage from "./pages/CreateLesson";
import Template1Tchr from "./components/CreateLesson/Template1Tchr";
import Template2Tchr from "./components/CreateLesson/Template2Tchr";
import Template3Tchr from "./components/CreateLesson/Template3Tchr";
import Template4Tchr from "./components/CreateLesson/Template4Tchr";
import Template5Tchr from "./components/CreateLesson/Template5Tchr";
import SelfStudy from "./pages/SelfStudy";
import SelfCategory from "./components/SelfStudy/SelfCategory";
import Level1 from "./components/SelfStudy/Level1";
import Level1Result from "./components/SelfStudy/Level1Result";
import Level2 from "./components/SelfStudy/Level2";
import Level2Result from "./components/SelfStudy/Level2Result";

export default function User() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/mainstd" element={<MainStdPage />} />
        <Route path="/maintchr" element={<MainTchrPage />} />
        <Route path="/lessontchr" element={<LessonTchrPage />} />
        <Route path="/lessonstd" element={<LessonStdPage />} />
        <Route path="/wordtchr" element={<WordTchrPage />} />
        <Route path="/wordstd" element={<WordStdPage />} />
        <Route path="/lessondetailtchr" element={<LessonDetailTchrPage />} />
        <Route path="/wordlearnstd" element={<WordLearnStdPage />} />
        <Route path="/wordcreatetchr" element={<WordCreateTchrPage />} />
        <Route path="/createlesson" element={<CreateLessonPage />} />
        <Route path="/template1tchr" element={<Template1Tchr />} />
        <Route path="/template2tchr" element={<Template2Tchr />} />
        <Route path="/template3tchr" element={<Template3Tchr />} />
        <Route path="/template4tchr" element={<Template4Tchr />} />
        <Route path="/template5tchr" element={<Template5Tchr />} />
        <Route path="/selfstudy" element={<SelfStudy />} />
        <Route path="/selfcategory" element={<SelfCategory />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/level1result" element={<Level1Result />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level2result" element={<Level2Result />} />
      </Routes>
      <FloatingButton />
      <Footer />
    </div>
  );
}
