import { TaskAddComp } from "@/components/component/task-add-comp";
import React from "react";
import { Link, useParams } from "react-router-dom";


const TaskForm = () => {
  const { id } = useParams();
  return (
    <>
      <div className="flex min-h-screen w-full bg-white">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-[#000] dark:bg-[#000] sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              to="/trainer-dashboard"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-all group-hover:scale-110"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="sr-only">Acme Trainer</span>
            </Link>
            
          </nav>
        </aside>
        <div className="flex flex-1 flex-col sm:gap-4 sm:py-4  ">
          <TaskAddComp planId={id} />
        </div>
      </div>
    </>
  );
};

export default TaskForm;
