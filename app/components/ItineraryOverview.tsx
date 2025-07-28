import Button from "./atom/Button";
import Image from "next/image";

export const ItineraryOverview = () => {
  return (
    <section className="p-6 bg-white border-b flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Image
          src="/location.jpg"
          alt="Trip Location"
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">Summer Getaway to Bali</h2>
          <p className="text-muted-foreground">12 July - 19 July, 2025</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4 md:mt-0">
        <Button variant="outline">Add Flight</Button>
        <Button variant="outline">Add Hotel</Button>
        <Button variant="outline">Add Activity</Button>
      </div>
    </section>
  );
};
