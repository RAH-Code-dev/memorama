import style from '@/styles/components/loading.module.css';

const Loading = ( { title } ) => {
  return (
    <section className={style.loading}>
      <article>
        <h2>{title}</h2>
      </article>
      <article className={style.loader}></article>
    </section>
  );
}

export default Loading;