import s from "./indexScreen.module.scss"
export default function IndexScreen() {

  return (
    <section
      id={s.hello}
      style={{ backgroundImage: "url('/img/image.jpg')" }}
    >
      <div className={s.mask}></div>
      <div className={s.container}>
        <h1>architectural bureau</h1>
      </div>
    </section>

  );
};
