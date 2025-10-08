import { getI18n } from "@/app/local/server";

const page = async () => {
  const t = await getI18n();

  return (
    <main>
      <div className="text-center text-2xl">{t("guild")}</div>
    </main>
  );
};

export default page;
