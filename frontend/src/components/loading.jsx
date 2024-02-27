import '@/styles/components/loading.css';

const Loading = ( { title } ) => {
  return (
    <section className="loading">
      <article>
        <h2>{title}</h2>
      </article>
      <article class="loader"></article>
    </section>
  );
}

export default Loading;