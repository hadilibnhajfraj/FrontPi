import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-lecon",
  templateUrl: "./lecon.component.html",
  styleUrls: ["./lecon.component.css"],
})
export class LeconComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  leconForm: FormGroup = this.formBuilder.group({
    nom: [undefined, [Validators.required]],
    descriptionContenu: [undefined, [Validators.required]],
    planCours: [undefined, [Validators.required]],
    horaire: [undefined, [Validators.required]],
    file: [undefined, [Validators.required]],
  });
  fileUploadForm: FormGroup;
  fileName: string = "";
  filePreview: string | ArrayBuffer | null = null;
  ngOnInit(): void {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreview = e.target.result;
      };
      reader.readAsDataURL(file);

      this.fileUploadForm.patchValue({
        file: file,
      });
    }
  }

  activeTab = 1;

  setActiveTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
