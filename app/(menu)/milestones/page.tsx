import MilestoneForm from "@/components/MilestoneForm";
import { Progress } from "@/components/ui/progress";
import { getMilestones } from "@/lib/milestone/getMilestone";
import { Bitcoin, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MilestonesPage() {
  const milestones = await getMilestones();
  const maxTotalMilestones: number = 3;

  return (
    <div className="p-6 flex flex-col space-y-8 w-full h-auto overflow-y-auto">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <Bitcoin size={50} className="text-primary" />
        <div>
          <h1 className="font-bold text-4xl">Milestone</h1>
          <i className="text-foreground/70">Make your dreams come true</i>
        </div>
      </div>
      {/* Milestone List */}
      <div className="overflow-y-auto flex flex-col gap-4">
        <div className="flex justify-between items-center text-foreground/60">
          <p className="font-semibold">Your Target(s)</p>
          <p>
            ({milestones.length}/{maxTotalMilestones})
          </p>
        </div>
      </div>
      {milestones.map((item) => (
        <Link
          key={item.title}
          href={`/milestones/${item.id}`}
          className="flex gap-6 bg-foreground/5 rounded-xl p-4"
        >
          <Image
            src={`${item.imageUrl}`}
            alt=""
            width={80}
            height={80}
            loading="lazy"
            className="rounded-xl object-cover"
          />
          <div className="w-full lg:w-auto">
            <h1 className="font-black text-lg">{item.title}</h1>
            <p className="inline-flex gap-2 items-center text-foreground/70">
              <Target size={20} className="text-primary" />{" "}
              <span>
                Target:{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(Number(item.targetAmount))}
              </span>
            </p>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(Number(item.currentAmount))}
              </p>
              <p>
                {Math.floor(
                  (Number(item.currentAmount) / Number(item.targetAmount)) * 100
                )}
                %
              </p>
            </div>
            <Progress
              value={Math.floor(
                (Number(item.currentAmount) / Number(item.targetAmount)) * 100
              )}
            />
          </div>
        </Link>
      ))}

      {milestones.length === 0 ||
        (milestones.length < maxTotalMilestones && <MilestoneForm />)}
    </div>
  );
}
