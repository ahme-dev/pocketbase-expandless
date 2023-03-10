import { Record } from "pocketbase";

// A type for testing without making a Record (if that is even possible)
export type RecordTest = {
	name: string;
	expand: {
		[key: string]: RecordTest | RecordTest[];
	};
};

// A Record type without the expand property
export type RecordExpandless = Omit<Record, "expand">;

// takes in a record or a list of records
// recursivly moves all the properties in the expand property to the record itself
// i.e product.expand.category_id -> product.category_id
// returns a record or a list of records
export function moveExpandsInline(
	record: Record[] | Record | RecordTest | RecordTest[],
): RecordExpandless {
	// clone record
	let newRecord: RecordExpandless = JSON.parse(JSON.stringify(record));

	// if got an array of records
	if (Array.isArray(newRecord)) {
		// go through each record
		for (let i = 0; i < newRecord.length; i++) {
			// run expandRelations on each record
			newRecord[i] = moveExpandsInline(newRecord[i]) as Record;
		}
	}

	// if has no expands, return as is
	if (Object.keys(newRecord.expand).length === 0) {
		delete newRecord.expand;
		return newRecord;
	}

	// otherwise go through each relation
	for (const key in newRecord.expand) {
		// set the expand value as a property
		newRecord[key] = newRecord.expand[key];

		// run expandRelations on expanded record to find nested expand record
		newRecord[key] = moveExpandsInline(newRecord[key]) as Record;
	}

	// remove expand field from record
	delete newRecord.expand;

	// return the record in the end
	return newRecord;
}
