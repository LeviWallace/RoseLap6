interface ProfileProps {
  picture: string;
  name: string;
  role: string;
}

export default function Profile({ picture, name, role }: ProfileProps) {
  return (
    <div className="flex w-[300px] h-[500px] bg-[#800000] flex-col items-center shadow-lg text-white pt-5 mt-5 mb-5">
      <div className="relative">
        <img
          src={picture}
          alt={`${name}'s profile`}
          className="w-[250px] h-auto object-cover border-4 border-white shadow-md"
        />
      </div>
      <div className="w-full h-1/3 text-center p-2 box-border">
        <p className="text-xl font-bold">{name}</p>
        <hr className="h-[1px] bg-white w-[85%] my-2 mx-auto" />
        <p className="text-lg">{role}</p>
      </div>
    </div>
  );
}
