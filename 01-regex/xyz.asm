default rel
section .text
global main
main:
push qword 1
push qword 2
pop rax
cmp [rsp],rax
sete  al
movzx qword rax, al
mov [rsp], rax
pop rax
ret
ret
section .data