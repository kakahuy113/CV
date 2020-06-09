import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  Inject,
} from "@angular/core";
import { NgwWowService } from "ngx-wow";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MailService } from "./services/SendMail/mail.service";
import * as $ from "jquery";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("header", { static: false }) header: ElementRef;
  @ViewChild("aboutUs", { static: false }) aboutUs: ElementRef;
  @ViewChild("ES", { static: false }) ES: ElementRef;
  @ViewChild("project", { static: false }) project: ElementRef;
  @ViewChild("contact", { static: false }) contact: ElementRef;

  title = "CVMaker";
  menuPosition: any;
  aboutPosition: any;
  ESPosition: any;
  projectPosition: any;
  contactPosition: any;
  sticky: boolean = false;
  AboutDocument;
  SEDocument;
  ProjectDocument;
  ContactDocument;
  contactForm: FormGroup;

  constructor(
    private wowService: NgwWowService,
    private fb: FormBuilder,
    private mail: MailService
  ) {
    this.wowService.init();
    this.contactForm = this.fb.group({
      contactFormName: ["Tran Gia Huy", Validators.required],
      contactFormEmail: [
        "abc@gmail.com",
        Validators.compose([Validators.required, Validators.email]),
      ],
      contactFormNo: [
        "0966653540",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9 ]{11}"),
        ]),
      ],
      contactFormMessage: ["Some Message", Validators.required],
    });
  }
  ngOnInit() {}
  clear() {
    this.contactForm.reset();
  }
  onSubmit() {    
    this.mail.sendMail(this.contactForm.value).subscribe(() => {
      alert("your message has been sent");
      this.contactForm.reset();
    }, err => {
      console.log("error", err);
      
    })
  }

  aboutmeContent(el: HTMLElement) {
    el.scrollIntoView();
  }
  ngAfterViewInit() {
    this.menuPosition = this.header.nativeElement.offsetTop;
    this.aboutPosition = this.aboutUs.nativeElement.offsetTop;
    this.contactPosition = this.contact.nativeElement.offsetTop;
    this.projectPosition = this.project.nativeElement.offsetTop;
    this.ESPosition = this.ES.nativeElement.offsetTop;
    this.AboutDocument = document.getElementById("aboutUs");
    this.ContactDocument = document.getElementById("contact");
    this.SEDocument = document.getElementById("SE");
    this.ProjectDocument = document.getElementById("project");
    $(window).scroll(function () {
      if ($(window).scrollTop() > 10) {
        $(".progress-bar").each(function () {
          const each_bar_width = $(this).attr("aria-valuenow");
          $(this).width(each_bar_width + "%");
        });
      }
    });
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }

    // About
    if (windowScroll >= this.aboutPosition) {
      document.getElementById("aboutUs").classList.add("active");
      this.aboutUs.nativeElement;
    } else {
      document.getElementById("aboutUs").classList.remove("active");
    }
    // S&E
    if (windowScroll >= this.ESPosition) {
      document.getElementById("SE").classList.add("active");
    } else {
      document.getElementById("SE").classList.remove("active");
    }
    // Project
    if (windowScroll >= this.projectPosition) {
      document.getElementById("project").classList.add("active");
    } else {
      document.getElementById("project").classList.remove("active");
    }
    //Contact
    if (windowScroll >= this.contactPosition) {
      document.getElementById("contact").classList.add("active");
    } else {
      document.getElementById("contact").classList.remove("active");
    }
  }
}
