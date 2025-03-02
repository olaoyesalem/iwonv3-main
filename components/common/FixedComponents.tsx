export default function FixedComponents({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="absolute left-0 bottom-0"> {children} </div>;
}
