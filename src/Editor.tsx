import Group from "./Group";
import { Entries, Entry } from "./types/Entries";
import * as React from "react";

function splitIntoEntries(data: string): Entry[] {
    const entries: string[] = data.split('\n');
    return entries.map(entry => {
        const nameAndRating = entry.split(',')
        return {
            name: nameAndRating[0],
            rating: nameAndRating[1]
        }
    })
}

function renderGroups(entries: Entry[]): JSX.Element {
    const entryCount = entries.length;
    
    const groupsOfPeople: Entries[] = []

    if (entryCount === 0) {
        return <div>No entries found</div>
    } else if (entryCount === 1) {
        groupsOfPeople.push([entries[0]])
    } else if (entryCount === 2) {
        groupsOfPeople.push(entries)
    } else if (entryCount % 4 === 3) {
        // make 1st group a group of 3
        for (let i=0; i<3; i++) {
            const intermediate = [];
            intermediate.push(entries.pop());
            groupsOfPeople.push(intermediate);
        }
    } else if (entryCount % 4 === 2) {
        // make 1st group a group of 3 and there will be another group of 3.
        for (let i=0; i<3; i++) {
            const intermediate = [];
            intermediate.push(entries.pop());
            groupsOfPeople.push(intermediate);
        }
    } else if (entryCount % 4 === 1) {
        // make 1st group a group of 5
        // Since we covered entryCount 1 above it will definitely have enough
        // This logic could be made nicer.
        for (let i=0; i<5; i++) {
            const intermediate = [];
            intermediate.push(entries.pop());
            groupsOfPeople.push(intermediate);
        }
    }

    // continue every 4 or do rest if there's not 4 remaining...
    while (entries.length > 0) {
        const intermediate = [];
        for (let i=0; i< 4; i++) {
            const entry = entries.pop();
            if (entry) {
                intermediate.push(entry);
            }
        }
        if (intermediate.length > 0) {
            groupsOfPeople.push(intermediate);
        }
    }

    const groups = groupsOfPeople.map(group => {
        return (
            <Group entries={group} />
        )
    })

    return (
        <div>
            {groups}
        </div>
    )
}

type EditorProps = {
    data: string;
};

export default function Editor(props: EditorProps) {
    const { data } = props;
    const entries: Entry[] = splitIntoEntries(data).sort((a, b) => parseInt(a.rating) - parseInt(b.rating));

    return (
        <div>
            {renderGroups(entries)}
        </div>
    );
}