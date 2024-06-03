function EntityItem(props: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <p className="flex items-center">
      <span className="font-medium leading-tight">{props.title}:&nbsp;</span>
      {props.children}
    </p>
  );
}

export default EntityItem;
