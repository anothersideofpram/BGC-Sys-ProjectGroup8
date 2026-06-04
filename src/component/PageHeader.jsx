export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{title}</h1>

        <div className="flex items-center font-medium space-x-2 mt-2 text-gray-500">
          {Array.isArray(breadcrumb)
            ? breadcrumb.map((item, index) => (
                <span key={index}>
                  {item} {index < breadcrumb.length - 1 && " / "}
                </span>
              ))
            : breadcrumb}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
