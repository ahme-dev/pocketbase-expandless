import { moveExpandsInline } from "../src/main";
import { describe, it, expect } from "vitest";

describe("moveExpandsInline", () => {
	it("should just remove the expand and turn into RecordExpandless if no expands found", async () => {
		expect(
			moveExpandsInline({
				name: "people",
				expand: {},
			} as any),
		).toMatchObject({
			name: "people",
		});
	});

	it("should move one expand inline", async () => {
		expect(
			moveExpandsInline({
				name: "people",
				expand: { product: { name: "jon", expand: {} } },
			}),
		).toMatchObject({ name: "people", product: { name: "jon" } });
	});

	it("should move three nested expands inline", async () => {
		expect(
			moveExpandsInline({
				name: "people",
				expand: {
					transactionProduct: {
						name: "tp",
						expand: {
							product: {
								name: "p",
								expand: {
									category: { name: "c", expand: {} },
								},
							},
						},
					},
				},
			}),
		).toMatchObject({
			name: "people",
			transactionProduct: {
				name: "tp",
				product: { name: "p", category: { name: "c" } },
			},
		});
	});

	it("should create an array of recordExpandless if provided an array of records", async () => {
		expect(
			moveExpandsInline([
				{ name: "Jon", expand: {} },
				{ name: "Lion", expand: {} },
			]),
		).toMatchObject([{ name: "Jon" }, { name: "Lion" }]);
	});

	it("should create arrays and subarrays according to the data present", async () => {
		expect(
			moveExpandsInline([
				{
					name: "Jon",
					expand: {
						numbers: [
							{
								name: "home number",
								expand: {},
							},
							{
								name: "work number",
								expand: {},
							},
						],
					},
				},
				{
					name: "Lion",
					expand: {
						address: {
							name: "George St.",
							expand: {},
						},
					},
				},
			]),
		).toMatchObject([
			{
				name: "Jon",
				numbers: [{ name: "home number" }, { name: "work number" }],
			},
			{ name: "Lion", address: { name: "George St." } },
		]);
	});
});
