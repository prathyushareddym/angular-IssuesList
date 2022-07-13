import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ISSUES } from './issue';

interface Issue {
  id: number;
  title: string;
  description: string;
  contactdetails: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  issues: Issue[] = ISSUES;
  issueForm: FormGroup;
  edit = false;
  constructor() {
    this.issueForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      contactdetails: new FormControl(),
    });
  }
  editIssue(item: Issue) {
    this.edit = true;
    this.issueForm = new FormGroup({
      id: new FormControl(item.id),
      title: new FormControl(item.title),
      description: new FormControl(item.description),
      contactdetails: new FormControl(item.contactdetails),
    });
  }
  add() {
    let issue = {
      id: this.issueForm.get('id').value,
      title: this.issueForm.get('title').value,
      description: this.issueForm.get('description').value,
      contactdetails: this.issueForm.get('contactdetails').value,
    };
    this.issues.push(issue);
    this.issueForm.reset();
  }
  save() {
    let index = this.issues.findIndex(
      (item) => item.id === this.issueForm.value.id
    );
    this.issues[index] = this.issueForm.value;
    this.edit = false;
    this.issueForm.reset();
  }
  delete(item) {
    this.issues.splice(item, 1);
  }

  cancel() {
    this.issueForm = null;
    this.edit = false;
  }
}
