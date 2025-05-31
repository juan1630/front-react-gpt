import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  title: string;
  description: string;
  icon: string;
}
export function Sidebar({ description, icon, title, to }: Props) {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors mt-3"
            : "flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors mt-3"
        }
        to={to}
      >
        <i className={`${icon} text-2xl mr-4 text-indigo`}></i>
        <div className="flex flex-col flex-grow">
          <span className="text-white text-lg font-semibold">{title}</span>
          <span className="text-gray-400 text-sm">{description}</span>
        </div>
        {title}
      </NavLink>
    </>
  );
}
