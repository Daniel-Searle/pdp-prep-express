import {getPdpVersion} from "@daniel-searle/github-package/build/main";

export class VersionService {
    public getVersion() {
        return getPdpVersion();
    }
}
