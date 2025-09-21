export function Banner(props: React.ComponentProps<'p'>) {
  return (
    <div className="bg-accent text-accent-content text-center py-2 text-sm">
      <p {...props} />
    </div>
  );
}
