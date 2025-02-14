import React from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { Button } from "@/components/ui/button";

// Define the props type
interface OutputImageDialogProps {
	openImageDialog: boolean;
	closeImageDialog: (value: boolean) => void;
	beforeImage: string | undefined;
	afterAiImage: string | undefined; // Change to a function type
}

function OutputImageDialog({
	openImageDialog,
	closeImageDialog,
	beforeImage,
	afterAiImage,
}: OutputImageDialogProps) {
	return (
		<div>
			<AlertDialog open={openImageDialog}>
				<AlertDialogContent>
					<AlertDialogTitle className="text-2xl font-bold mb-4">
						Your AI Redesign
					</AlertDialogTitle>
					<AlertDialogHeader>
						<h2 className="text-2xl font-bold text-colors-custom-purple mb-5">
							Redesigned Result{" "}
						</h2>
						<ReactBeforeSliderComponent
							firstImage={{
								imageUrl: afterAiImage || "",
							}}
							secondImage={{
								imageUrl: beforeImage || "",
							}}
						/>
						<Button
							onClick={(e) => {
								e.stopPropagation();
								closeImageDialog(false);
							}}
							className="bg-colors-custom-purple mb-5"
						>
							CLOSE
						</Button>
					</AlertDialogHeader>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export default OutputImageDialog;
