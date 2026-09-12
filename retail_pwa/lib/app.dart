// lib/app.dart
import 'package:jaspr/jaspr.dart';
import 'package:jaspr/dom.dart';

class App extends StatelessComponent {
  const App({super.key});

  @override
  Component build(BuildContext context) {
    return div(classes: 'min-h-screen bg-gray-50 text-gray-900 flex flex-col', [
      header(classes: 'flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm', [
        div(classes: 'flex items-center space-x-3', [
          div(classes: 'h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold', [
            text('R'),
          ]),
          div([
            h1(classes: 'text-lg font-bold leading-tight', [text('Retail Presentation Designer')]),
            p(classes: 'text-xs text-gray-500', [text('Jaspr + Cloudflare Worker Edition')]),
          ]),
        ]),
      ]),
      // Use main_() to render the  HTML tag without conflicting with Dart's main()
      main_(classes: 'flex-1 max-w-7xl w-full mx-auto p-6', [
        div(classes: 'mb-8', [
          h2(classes: 'text-2xl font-extrabold', [text('Showroom Tool Suite')]),
          p(classes: 'text-sm text-gray-500 mt-1', [
            text('Select an offline tool below to process inventory or layout floor plans.'),
          ]),
        ]),
        div(classes: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', [
          // Tool cards...
        ]),
      ]),
    ]);
  }
}