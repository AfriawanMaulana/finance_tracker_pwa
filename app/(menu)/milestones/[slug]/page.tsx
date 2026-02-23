import { Progress } from "@/components/ui/progress";
import { milestoneDetail } from "@/lib/milestone/getMilestone";

import { ArrowLeft, Target } from "lucide-react";
import Image from "next/image";
import SavingsButton from "./SavingsButton";
import { DeleteButton } from "./DeleteButton";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const milestone = await milestoneDetail(slug);

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Banner */}
      <div className="relative">
        <Image
          src={`${milestone?.imageUrl}`}
          alt={`${milestone?.title}`}
          width={250}
          height={200}
          className="w-full h-72 object-cover brightness-75"
        />
        <div className="absolute flex justify-between w-full top-4 px-4">
          <Link href={"/milestones"} className="z-10">
            <ArrowLeft />
          </Link>
          <div className="z-10">
            <DeleteButton id={slug} />
          </div>
        </div>
        <div className="absolute flex top-0 items-end p-4 bg-linear-to-t from-background via-transparent to-transparent w-full h-full">
          <div>
            <div className="flex items-center gap-2">
              <Target className="text-primary" />
              <h1 className="font-bold text-3xl">{milestone?.title}</h1>
            </div>
            <p className="text-right">
              Target:{" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(Number(milestone?.targetAmount))}
            </p>
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="p-4">
        <div className="border rounded-2xl mt-6 p-4 space-y-4 bg-slate-400/5">
          <div>
            <p className="text-foreground/50">Current Balance</p>
            <p className="font-bold text-2xl inline-flex items-end justify-between w-full truncate">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(Number(milestone?.currentAmount))}
              <span className="text-lg">
                {Math.floor(
                  (Number(milestone?.currentAmount) /
                    Number(milestone?.targetAmount)) *
                    100
                )}
                %
              </span>
            </p>
          </div>
          <Progress
            value={Math.floor(
              (Number(milestone?.currentAmount) /
                Number(milestone?.targetAmount)) *
                100
            )}
          />
          <p className="text-center text-foreground/50 font-semibold">
            Less than{" "}
            <b className="text-foreground">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(
                Number(milestone?.targetAmount) -
                  Number(milestone?.currentAmount)
              )}
            </b>{" "}
            left to reach the target.
          </p>
        </div>
      </div>

      {/*  */}
      <SavingsButton id={slug} />
    </div>
  );
}
