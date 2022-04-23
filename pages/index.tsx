import Row from "../components/Row";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Banner from "../components/Banner";
import Header from "../components/Header";
import requests from "../utils/requsets";
import Layout from "@components/Layout";
import { useAuth } from "@hooks/useAuth";
import Modal from "@components/Modal";
import { modalState, movieState } from '@states/modal';

type PropsType<T> = T extends Promise<{ props: infer Props }> ? Props : never;

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: PropsType<typeof getServerSideProps>) => {
  const auth = useAuth();

  return (
    <Layout>
      <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
        <Header />
        <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
          <Banner netflixOriginals={netflixOriginals} />
          <section className="md:space-y-24">
            <Row title="Trending Now" movies={trendingNow} />
            <Row title="Top Rated" movies={topRated} />
            <Row title="Action Thrillers" movies={actionMovies} />
            {/* My List */}
            {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

            <Row title="Comedies" movies={comedyMovies} />
            <Row title="Scary Movies" movies={horrorMovies} />
            <Row title="Romance Movies" movies={romanceMovies} />
            <Row title="Documentaries" movies={documentaries} />
          </section>
        </main>
        <Modal />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
export default Home;
