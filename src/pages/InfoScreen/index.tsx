import classNames from "classnames";
import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import AnimeCarousel from "../../components/AnimeCarousel";
import Button from "../../components/Button";
import Image from "../../components/Image";
import Loader from "../../components/Loader";
import Skeleton from "../../components/Skeleton";
import useFetchInfo from "./useFetchInfo";

const InfoScreen = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  if (!slug) {
    navigate("/");
  }

  const handleClick = () => {
    navigate(`/watch/${slug}`);
  };

  const { data: info, isLoading } = useFetchInfo(slug);

  if (isLoading) return <Loader />;

  return (
    <div className="py-16">
      <div className="w-full">
        <div className="w-full h-56 overflow-hidden">
          <Image
            src={info?.backgroundImage!}
            className="w-full object-cover filter blur-lg opacity-30"
          />
        </div>
        <div className="space-y-4 md:space-x-4 w-full px-2 md:px-12 lg:px-24 -mt-28 md:-mt-14 flex items-center justify-center flex-col md:items-start md:justify-start md:flex-row">
          <div className="w-full md:w-44 lg:w-52 space-y-4 md:space-y-0">
            <Image
              src={info?.image!}
              alt={info?.title}
              className={classNames(
                "mx-auto filter blur-none w-44 lg:w-52 h-60 lg:h-80 object-cover rounded-md md:rounded-b-none"
              )}
              loader={
                <Skeleton>
                  <div className="w-full h-48 md:h-60 lg:h-80 animate-pulse bg-gray-600"></div>
                </Skeleton>
              }
            />
            <div
              className={classNames(
                "text-white md:bg-background-darker p-3 w-full space-y-2 rounded-b-md min-h-11"
              )}
            >
              <h1 className="text-base line-clamp-1">{info?.altTitle}</h1>

              <div>
                <h1 className="text-sm line-clamp-1">
                  Lịch chiếu: {info?.showtime}
                </h1>

                <h1 className="text-sm line-clamp-1">
                  Thời lượng: {info?.time}
                </h1>

                <h1 className="text-sm line-clamp-1">
                  Trạng thái: {info?.status}
                </h1>

                <h1 className="text-sm line-clamp-1">
                  Độ tuổi: {info?.rating}
                </h1>

                <h1 className="text-sm line-clamp-1">
                  Ngôn ngữ: {info?.language}
                </h1>

                <h1 className="text-sm line-clamp-1">Studio: {info?.studio}</h1>

                <h1 className="text-sm line-clamp-1">
                  Theo dõi: {info?.followers}
                </h1>

                <h1 className="text-sm line-clamp-1">
                  Quốc gia: {info?.nations?.map(({ name }) => name).join(", ")}
                </h1>
              </div>
            </div>
          </div>

          <div className="w-full px-2 flex flex-col flex-1">
            <Button
              className="-mt-2 self-center md:self-start bg-background-darker filter blur-none text-primary font-bold text-lg"
              onClick={handleClick}
              startIcon={BsPlayFill}
              iconSize={20}
            >
              Xem ngay
            </Button>

            <div className="mt-6 space-y-2">
              <div className="space-y-1">
                <h1 className="text-white text-2xl">{info?.title}</h1>
                <h1 className="text-gray-400 text-base">
                  Thể loại: {info?.genres.map(({ name }) => name).join(", ")}
                </h1>
              </div>

              <h1 className="text-gray-300 text-base">{info?.description}</h1>
            </div>
          </div>
        </div>

        <div className="mt-12 px-4 space-y-4">
          <h1 className="text-white font-medium text-2xl">Phim liên quan</h1>
          <div className="px-8">
            <AnimeCarousel data={info?.relatedAnime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoScreen;
