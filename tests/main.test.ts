import { moveExpandsInline } from "../src/main";
import { describe, it, expect } from "vitest";

describe("moveExpandsInline", () => {
	it("should just remove the expand if no expands found", async () => {
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
});
