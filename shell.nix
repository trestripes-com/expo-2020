{ pkgs ? import <nixpkgs> { } }:

with pkgs;

mkShell {
  buildInputs = [
    git
    gnumake

    yarn
    nodePackages.serve

    epeg
    jpegoptim

    rclone
  ];
}
