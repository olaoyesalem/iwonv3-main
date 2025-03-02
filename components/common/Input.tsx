import useTheme from "../hooks/useTheme";

interface propTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  success?: boolean;
  err?: any;
}

const Input = ({ success, err, ...rest }: propTypes) => {
  const { mode } = useTheme();
  return (
    <input
      {...rest}
      className={`${mode === "dark" ? "bg-gray-900 text-gray-100 border-gray-600" : "bg-white !text-gray-800"} focus:outline-none focus:ring-1 rounded focus:ring-blue-600 block w-full px-3 h-[50px] pr-6 border  focus:border-blue-600 placeholder:text-sm disabled:opacity-50 ${rest.className}
        `}
    />
  );
};

export default Input;
