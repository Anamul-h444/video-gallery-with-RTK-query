import RelatedVideo from "./RelatedVideo";
import { useGetRelatedVideosQuery } from "../../../redux/apiSlice";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import Error from "../../ui/Error";

export default function RelatedVideos({ id, title }) {
  const { data, isLoading, isError } = useGetRelatedVideosQuery({ id, title });

  let content = null;
  if (isLoading)
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );
  if (!isLoading && isError) content = <Error message="Error occoured!" />;
  if (!isLoading && !isError && data?.length === 0)
    content = <Error message="No video found!" />;
  if (!isLoading && !isError && data?.length > 0)
    content = data.map((video) => (
      <RelatedVideo video={video} key={video.id} />
    ));
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
