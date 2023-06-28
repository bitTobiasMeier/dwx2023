import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component } from "@angular/core";
import { Observable} from "rxjs";
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: "dinner-frontend-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Effektive Entwicklung mit TypeScript";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
