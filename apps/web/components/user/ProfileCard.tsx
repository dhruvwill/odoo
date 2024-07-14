import { Mail, Phone, BookText } from "lucide-react";
import React from "react";

type Props = {
  className?: string;
};

const ProfileCard = ({ className }: Props) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border md:w-1/3 w-full my-3">
      <div className="px-4 py-5 sm:px-6 flex gap-3">
        <div className="inline-block">
          <img
            className="h-12 w-12 rounded-md"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt=""
          />
        </div>
        <div>
          <h3 className="text-md leading-6 font-medium text-gray-900">
            Mitchell
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Your Company</p>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {/* <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              John Doe
            </dd>
          </div> */}
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 max-w-max">
              {/* Email address */}
              <Mail />
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              johndoe@example.com
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              <Phone />
              {/* Phone number */}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              (123) 456-7890
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {/* <House /> */}
              <BookText />
              {/* Address */}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              123 Main St
              <br />
              Anytown, USA 12345
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProfileCard;
