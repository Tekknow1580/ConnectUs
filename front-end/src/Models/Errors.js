export class Errors {
    ID;
    Msg;
    Show;

    constructor(ID, Message, Show = false) {
        this.ID = ID;
        this.Msg = Message;
        this.Show = Show;
    }

    Message(Message = "", Show = false) {
        if (Message !== "")
            this.Msg = Message;
        if (Show === true)
            this.Show = true;
        if (this.Show === true)
            return this.Msg;
        return "";
    }

    ShowMsg = () => this.Show = true

    HideMsg = () => this.Show = false

}