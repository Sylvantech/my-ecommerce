export default function UserFetch() {
    return (
        <tbody>
            <tr className="text-gray-600">
            <td className="p-2 border border-gray-300">1</td>
            <td className="p-2 border border-gray-300">Indiana</td>
            <td className="p-2 border border-gray-300">indiana@example.com</td>
            <td className="p-2 border border-gray-300">Active</td>
            <td className="p-2 border border-gray-300">Admin</td>
            <td className="p-2 border border-gray-300">2023-01-01</td>
            <td className="p-2 border border-gray-300">2023-02-01</td>
            <td className="p-2 border border-gray-300">10%</td>
            <td className="p-2 border border-gray-300">
                <button className="px-2 py-1 bg-blue-500 text-white rounded mr-1">Edit</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </td>
            </tr>
        </tbody>
    );
}