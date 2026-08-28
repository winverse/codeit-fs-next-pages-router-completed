import { useRouter } from "next/router";

export default function MovieCatchAllPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Movie Catch All</h1>
      <p>{JSON.stringify(id)}</p>
    </div>
  );
}
