import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useMemo, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {TYPES_OPTIONS} from "@/constants";
import {CreateButton} from "@/components/refine-ui/buttons/create.tsx";
import {useTable} from "@refinedev/react-table";
import {Words} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge.tsx";
import {DataTable} from "@/components/refine-ui/data-table/data-table.tsx";
import {Link} from "react-router";

const TiersList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All");

    const searchFilter = searchQuery == '' ? [] : [
        { field: 'name', operator: 'contains' as const, value: searchQuery }
    ];

    const subjectTable = useTable<Words>({
        columns: useMemo<ColumnDef<Words>[]>(()=>[
            {
                id: 'name',
                accessorKey: 'name',
                size: 50,
                header: ()=> <p className="column-title ml-2">Name</p>,
                cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
                filterFn: 'includesString'
            },
            {
                id: 'type',
                accessorKey: 'type.name',
                size: 50,
                header: ()=> <p className="column-title ml-2">Type</p>,
                cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
            },
            {
                id: 'link',
                accessorKey: 'link',
                size:50,
                header: () => <p className = "column-title ml-2">Link</p>,
                cell: ({getValue}) => <a target="_blank" href={getValue<string>()} className="text-foreground">Click here</a>
            },
            {
                id: 'description',
                accessorKey: 'description',
                size: 150,
                header: ()=> <p className="column-title ml-2">Description</p>,
                cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
            },

        ], []),
        refineCoreProps:{
            resource: 'words',
            pagination: { pageSize: 10, mode: 'server'},
            filters: {
                permanent: [...searchFilter],
            },
            sorters: {
                initial: [
                    {field: 'id', order: 'desc'}
                ]
            },
        }
    });
    return (
        <ListView>
            <Breadcrumb />

            <h1 className="page-title">Words</h1>

            <div className="intro-row">
                <p>blah blah blah</p>

                <div className="actions-row">
                    <div className="search-field">
                        <Search className="search-icon" />

                        <Input
                            type="text"
                            placeholder="Search by name"
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select
                            value={selectedDepartment}
                            onValueChange={setSelectedDepartment}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by genre" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">
                                    All Words
                                </SelectItem>
                                {TYPES_OPTIONS.map(genre => (
                                    <SelectItem key={genre.value} value={genre.label}>
                                        {genre.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <CreateButton/>

                    </div>
                </div>
            </div>
            <DataTable table={subjectTable}/>
        </ListView>
    )
}
export default TiersList
