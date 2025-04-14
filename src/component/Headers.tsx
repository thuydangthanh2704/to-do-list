"use client";
import Image from "next/image";

interface HeaderProps {
  selectedProjectName: string;
  showModal: () => void;
  currentDate: string;
}

export default function Header({
  selectedProjectName,
  showModal,
  currentDate,
}: HeaderProps) {
  return (
    <div className="h-[200px] bg-[url('/imgs/banner_header.png')] bg-teal-500 lg:px-64 md:px-10">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <Image
            src="/imgs/logo.svg"
            alt=""
            width={100}
            height={100}
            className="w-auto h-auto"
          />
          <button
            className="text-white rounded cursor-pointer ml-4 border-b-gray-400 px-5 py-1 h-1/2 flex justify-between items-center"
            onClick={showModal}
          >
            <p>{selectedProjectName}</p>
            <span className="ml-4">
              <Image
                src="./imgs/img_folder.svg"
                alt=""
                width={20}
                height={20}
              />
            </span>
          </button>
        </div>
        <div className="flex justify-between items-center p-8">
          <p className="text-lg font-semibold text-amber-50">{currentDate}</p>
        </div>
      </div>
    </div>
  );
}
