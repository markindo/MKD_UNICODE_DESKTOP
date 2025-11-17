export default function ExcelViewer({ data }) {
    const headers = Object.keys(data[0] || {});

    return (
        <div className="mt-4 overflow-auto border rounded">
            <table className="min-w-full text-sm border-collapse">
                <thead>
                    <tr>
                        {headers.map((h) => (
                            <th key={h} className="border px-2 py-1 bg-gray-100 text-left">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            {headers.map((h) => (
                                <td key={h} className="border px-2 py-1">
                                    {row[h]?.toString()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
