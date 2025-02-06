import Counter from "./components/Counter";
import Form from "./components/Form";
import Navbar from "./components/Nav";
import Theme from "./components/ThemeProvider";

export default function Home() {
  return (
    <Theme>
      <Navbar />
      <Form />
      <Counter />
    </Theme>
  );
}
