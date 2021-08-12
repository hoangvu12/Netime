import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import AnimeCarousel from "../../components/AnimeCarousel";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import useFetchInfo from "./useFetchInfo";

const Pair = ({
  pairKey,
  pairValue,
  onValue = (data, index, arr) => (
    <p className="text-white" key={index}>
      {data.name}
      {arr.length - 1 !== index ? "," : ""}
    </p>
  ),
}: {
  pairKey: string;
  pairValue: any[] | string | undefined;
  onValue?: (value: any, index: number, arr: any[]) => React.ReactNode;
}) => (
  <div className="flex items-center text-base">
    <p className="text-gray-500 font-bold mr-2">{pairKey}: </p>
    {Array.isArray(pairValue) ? (
      <div className={"text-white flex items-center space-x-1"}>
        {pairValue.map((value, index, arr) => onValue?.(value, index, arr))}
      </div>
    ) : (
      <p className="text-white">{pairValue}</p>
    )}
  </div>
);

const InfoScreen = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  if (!slug) {
    navigate("/");
  }

  const { data: info, isLoading } = useFetchInfo(slug);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full space-y-12 flex flex-col">
      <div className="relative w-5/6 self-center">
        <img
          src={info?.backgroundImage}
          alt={info?.title}
          className="object-cover w-full rounded-md"
        />
        <div className="flex absolute inset-0 bg-black bg-opacity-80">
          <div className="flex w-full px-8 py-14 self-end space-y-2">
            <img
              src={info?.image}
              alt={info?.title}
              className="object-cover w-40 h-72 mr-4 rounded-md"
            />
            <div className="w-full self-end space-y-2">
              <div>
                <h1 className="text-white text-3xl font-medium">
                  {info?.title}
                </h1>
                <h1 className="text-white text-xl font-medium">
                  {info?.altTitle}
                </h1>
              </div>

              <p className="text-gray-400 text-lg line-clamp-5 mb-2">
                {info?.description}
              </p>

              <Button
                className="bg-primary text-white mt-2"
                iconClassName="text-white"
                startIcon={BsPlayFill}
                iconSize={26}
                to={`/watch/${slug}`}
              >
                Xem ngay
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        <AnimeCarousel data={info?.relatedAnime} />
      </div>

      <div className="space-y-4">
        <h1 className="text-white font-medium text-3xl">
          Thông tin về <strong>{info?.title}</strong>
        </h1>

        <div className="space-y-1">
          <Pair pairKey="Lịch chiếu" pairValue={info?.showtime} />
          <Pair pairKey="Trạng thái" pairValue={info?.status} />
          <Pair
            pairKey="Thể loại"
            pairValue={info?.genres}
            onValue={(data) => (
              <Link to={`/genres/${data.slug}`} key={data.slug}>
                <p className="text-blue-500">{data.name},</p>
              </Link>
            )}
          />
          <Pair pairKey="Đạo diễn" pairValue={info?.directors} />
          <Pair pairKey="Quốc gia" pairValue={info?.nations} />
          <Pair pairKey="Theo dõi" pairValue={info?.followers} />
        </div>

        <div className="space-y-1">
          <Pair pairKey="Thời lượng" pairValue={info?.time} />
          <Pair pairKey="Độ tuổi" pairValue={info?.rating} />
          <Pair pairKey="Ngôn ngữ" pairValue={info?.language} />
          <Pair pairKey="Studio" pairValue={info?.studio} />
          <Pair
            pairKey="Season"
            pairValue={info?.seasons}
            onValue={(data) => (
              <Link to={`/seasons/${data.slug}`} key={data.slug}>
                <p className="text-blue-500">{data.name},</p>
              </Link>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoScreen;
