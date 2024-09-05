export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",      
  java: "15.0.2",      
  cpp: "10.2.0",         
  c: "10.2.0",            
  csharp: "6.12.0",    
  go: "1.16.2",         
  rust: "1.68.2",        
  kotlin: "1.8.20",      
  swift: "5.3.3",         
  typescript: "5.0.3",   
  php: "8.2.3",           
  ruby: "3.0.1",          
  scala: "3.2.2",        
  dart: "2.19.6",        
 
  zig: "0.10.1",         
};



      
export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Sushen");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Sushen" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Sushen")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World, Sushen");\n\t}\n}\n`,
  csharp: `\nusing System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C# for Sushen");\n\t\t}\n\t}\n}\n`,
  php: `<?php\n\n$name = 'Sushen';\necho "Hello, " . $name . "!\n";\n?>\n`,
  ruby: `\ndef greet(name)\n\tputs "Hello, #{name}!"\nend\n\ngreet("Sushen")\n`,
  go: `\npackage main\n\nimport "fmt"\n\nfunc greet(name string) {\n\tfmt.Println("Hello, " + name + "!")\n}\n\nfunc main() {\n\tgreet("Sushen")\n}\n`,
  swift: `\nfunc greet(name: String) {\n\tprint("Hello, \(name)!")\n}\n\ngreet(name: "Sushen")\n`,
  rust: `\nfn greet(name: &str) {\n\tprintln!("Hello, {}!", name);\n}\n\nfn main() {\n\tgreet("Sushen");\n}\n`,
  kotlin: `\nfun greet(name: String) {\n\tprintln("Hello, $name!")\n}\n\ngreet("Sushen")\n`,
  scala: `\nobject HelloWorld {\n\tdef main(args: Array[String]): Unit = {\n\t\tprintln("Hello World, Sushen")\n\t}\n}\n`,
  dart: `\nvoid greet(String name) {\n\tprint("Hello, \$name!");\n}\n\nvoid main() {\n\tgreet("Sushen");\n}\n`,
  R: `\n# R code\n\ngreet <- function(name) {\n\tcat("Hello, ", name, "!\n")\n}\n\ngreet("Sushen")\n`,
  c: `\n#include <stdio.h>\n\nint main() {\n\tprintf("Hello, Sushen!\\n");\n\treturn 0;\n}\n`,
  cpp: `\n#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, Sushen!" << std::endl;\n\treturn 0;\n}\n`,
};
