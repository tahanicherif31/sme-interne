import { getTranslations } from "next-intl/server";
import Image from "next/image";

const DynamicCard = async ({
  sector,
}: {
  sector: { title: string; image: string; description: string };
}) => {
  const t = await getTranslations();
  return (
    <div className="relative group overflow-hidden">
      <Image
        src={sector.image}
        alt="image_sector"
        width={300}
        height={200}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-8 flex flex-col gap-4 px-8 text-white">
        <p className="font-bold text-lg underline underline-offset-8 decoration-tertiary">
          {t(sector.title)}
        </p>
        <p className="lg:opacity-0 lg:max-h-0 group-hover:opacity-100 group-hover:max-h-40 text-md font-normal p-1 backdrop-blur-md bg-[#21364a]/5 rounded-md transition-all duration-800 ease-in-out">
          {t(sector.description)}
        </p>
      </div>
    </div>
  );
};

export default DynamicCard;
