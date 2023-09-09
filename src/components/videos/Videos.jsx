import Video from "./Video";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import { useGetVideosQuery } from "../../redux/apiSlice";

export default function Videos() {
  const { data, isError, isLoading } = useGetVideosQuery();

  let content = null;
  if (isLoading) {
    content = <VideoLoader />;
  }
  if (!isLoading && isError)
    content = <Error message="Something went wrong!" />;
  if (!isLoading && !isError && data?.length === 0)
    content = <Error message="Videos not found!" />;
  if (!isLoading && !isError && data?.length > 0) {
    content = data.map((video) => <Video key={video.id} video={video} />);
  }

  return content;
}
