import PageHeader from "../../component/PageHeader";
const customers = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@mail.com`,
  phone: `08${Math.floor(Math.random() * 1000000000)}`,
  loyalty: ["Bronze", "Silver", "Gold"][i % 3],
}));
export default function Customers() {
  return (
    <div>
      <PageHeader title="Customers" breadcrumb={["Home", "Customers"]}>
        <button className="bg-hijau text-white px-4 py-2 rounded-lg">
          Add Customer
        </button>
      </PageHeader>

      <div className="p-4">
        <p className="text-gray-600">This is the customers page content.</p>
      </div>
    </div>
  );
}
