import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import Counter from "./components/Counter";
import LikeToggle from "./components/LikeToggle";
import Greeter from "./components/Greeter";
import StudentList from "./components/StudentList";
import Footer from "./components/Footer";

export default function App() {
  const containerStyle = {
    maxWidth: 800,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={containerStyle}>
      <Header />
      <ProfileCard
        name="정내혁"
        major="인공지능"
        interests={["머신러닝", "웹개발", "음악"]}
        avatarUrl="https://via.placeholder.com/100"
      />
      <Counter />
      <LikeToggle />
      <Greeter />
      <StudentList />
      <Footer />
    </div>
  );
}
